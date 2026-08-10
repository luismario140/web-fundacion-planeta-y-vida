create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
grant select on public.site_settings to anon, authenticated;
grant insert, update, delete on public.site_settings to authenticated;

drop policy if exists "Public can read site settings"
on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admin can insert site settings"
on public.site_settings;
create policy "Admin can insert site settings"
on public.site_settings
for insert
to authenticated
with check (public.is_admin() and updated_by = auth.uid());

drop policy if exists "Admin can update site settings"
on public.site_settings;
create policy "Admin can update site settings"
on public.site_settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin() and updated_by = auth.uid());

drop policy if exists "Admin can delete site settings"
on public.site_settings;
create policy "Admin can delete site settings"
on public.site_settings
for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read site assets"
on storage.objects;
create policy "Public can read site assets"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-assets');

drop policy if exists "Admin can upload site assets"
on storage.objects;
create policy "Admin can upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "Admin can update site assets"
on storage.objects;
create policy "Admin can update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets' and public.is_admin())
with check (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "Admin can delete site assets"
on storage.objects;
create policy "Admin can delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets' and public.is_admin());
