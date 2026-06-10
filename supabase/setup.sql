-- Ejecuta este archivo una sola vez en Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
grant select on public.admin_users to authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Admin can read own authorization"
on public.admin_users;
create policy "Admin can read own authorization"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 160),
  description text,
  category text not null default 'Legal',
  file_path text not null unique,
  file_name text not null,
  file_size bigint not null check (file_size > 0 and file_size <= 10485760),
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.documents enable row level security;
grant select on public.documents to anon, authenticated;
grant insert, update, delete on public.documents to authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists documents_set_updated_at on public.documents;
create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

drop policy if exists "Public can read published documents"
on public.documents;
create policy "Public can read published documents"
on public.documents
for select
to anon, authenticated
using (is_published = true or public.is_admin());

drop policy if exists "Admin can insert documents"
on public.documents;
create policy "Admin can insert documents"
on public.documents
for insert
to authenticated
with check (public.is_admin() and created_by = auth.uid());

drop policy if exists "Admin can update documents"
on public.documents;
create policy "Admin can update documents"
on public.documents
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can delete documents"
on public.documents;
create policy "Admin can delete documents"
on public.documents
for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'institutional-documents',
  'institutional-documents',
  false,
  10485760,
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read published PDF files"
on storage.objects;
create policy "Public can read published PDF files"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'institutional-documents'
  and (
    public.is_admin()
    or exists (
      select 1
      from public.documents
      where documents.file_path = storage.objects.name
        and documents.is_published = true
    )
  )
);

drop policy if exists "Admin can upload PDF files"
on storage.objects;
create policy "Admin can upload PDF files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'institutional-documents'
  and public.is_admin()
  and storage.extension(name) = 'pdf'
);

drop policy if exists "Admin can update PDF files"
on storage.objects;
create policy "Admin can update PDF files"
on storage.objects
for update
to authenticated
using (bucket_id = 'institutional-documents' and public.is_admin())
with check (bucket_id = 'institutional-documents' and public.is_admin());

drop policy if exists "Admin can delete PDF files"
on storage.objects;
create policy "Admin can delete PDF files"
on storage.objects
for delete
to authenticated
using (bucket_id = 'institutional-documents' and public.is_admin());

-- Después de crear manualmente el usuario propietario en Authentication > Users,
-- reemplaza el correo y ejecuta únicamente esta sentencia:
--
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'correo-del-propietario@dominio.com'
-- on conflict (user_id) do nothing;
