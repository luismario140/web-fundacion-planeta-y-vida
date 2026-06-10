# Configuración del dashboard documental

## 1. Crear el proyecto

1. Crea un proyecto en [Supabase](https://supabase.com/dashboard).
2. Abre **SQL Editor**.
3. Copia y ejecuta todo el contenido de `supabase/setup.sql`.

Este script crea:

- La tabla de administradores.
- La tabla de documentos.
- El bucket privado para PDF.
- Las políticas de seguridad RLS.
- El límite de 10 MB y la restricción a archivos PDF.

## 2. Crear al propietario

1. En Supabase abre **Authentication > Users**.
2. Crea manualmente el usuario del propietario con su correo y contraseña.
3. Regresa a **SQL Editor** y ejecuta:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'CORREO_REAL_DEL_PROPIETARIO'
on conflict (user_id) do nothing;
```

No habilites registro público de usuarios.

## 3. Configurar el proyecto local

1. Copia `.env.example` como `.env.local`.
2. En Supabase abre **Project Settings > API Keys**.
3. Completa:

```env
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_TU_CLAVE
```

Usa únicamente la clave **publishable**. Nunca incluyas una `secret` o
`service_role` en este proyecto frontend.

## 4. Configurar Netlify

En **Site configuration > Environment variables**, crea las mismas variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Después ejecuta un nuevo despliegue.

## 5. Acceder

- Inicio de sesión: `/admin/login`
- Gestión documental: `/admin/documentos`
- Documentos públicos: `/transparencia`

El dashboard no aparece en el menú público. La seguridad real depende de Auth y
las políticas RLS incluidas en `supabase/setup.sql`, no de ocultar la ruta.
