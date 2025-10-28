# Environment Variables Kurulumu

## .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki içeriği ekleyin:

```env
# Supabase Configuration
# Supabase Dashboard -> Settings -> API bölümünden kopyalayın
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Credentials
NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
```

## Supabase Bilgilerini Nasıl Alırsınız?

1. https://supabase.com/dashboard adresine gidin
2. Projenizi seçin
3. Settings (⚙️) → API'ye tıklayın
4. Şu bilgileri kopyalayın:
   - **Project URL**: `https://abcdefgh.supabase.co` şeklinde
   - **anon public key**: Uzun bir string (eyJ...)

## Dosyayı Oluşturma - Hızlı Yol

PowerShell'de şu komutu çalıştırın:

```powershell
@"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Credentials
NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
"@ | Out-File -FilePath .env.local -Encoding utf8
```

Sonra bilgilerinizi manuel olarak güncelleyin!

## Test Etme

Dosyayı oluşturduktan sonra:

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine gidin ve console'da şunu görmelisiniz:

```
📊 Loaded data from Supabase: {...}
```
