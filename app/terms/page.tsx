import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description: 'icnevudila Kullanım Şartları - Web sitesi kullanımına ilişkin kurallar ve yasal yükümlülükler.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#1e293b]">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#F97316]">Kullanım Şartları</h1>
          <p className="text-gray-400 mb-8">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">1. Genel Hükümler</h2>
              <p className="mb-4">
                Bu web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş olursunuz. 
                Bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayın.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">2. Telif Hakları</h2>
              <p className="mb-4">
                Bu web sitesindeki tüm içerik (metinler, görseller, tasarımlar, kod) icnevudila'ya aittir 
                ve telif haklarıyla korunmaktadır.
              </p>
              <p className="mb-4">
                İçeriği kopyalamak, yeniden yayımlamak veya ticari amaçla kullanmak için izin alınmalıdır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">3. Kullanım Kısıtlamaları</h2>
              <p className="mb-4">Aşağıdaki faaliyetler yasaktır:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Sitenin çalışmasını engellemek veya bozmak</li>
                <li>Üçüncü tarafların erişimini engellemek</li>
                <li>Siteyi kötü amaçlı yazılım yaymak için kullanmak</li>
                <li>Otomatik botlar veya scriptlerle aşırı yük oluşturmak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">4. İçerik Doğruluğu</h2>
              <p className="mb-4">
                Sitede yer alan bilgiler doğru olmaya çalışılır, ancak yanlışlık veya eksiklik 
                olabileceği durumlarda sorumluluk kabul edilemez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">5. Üçüncü Taraf Linkler</h2>
              <p className="mb-4">
                Bu web sitesinde üçüncü taraf web sitelerine linkler bulunabilir. Bu linklerden 
                doğacak sorumluluk link sahibi web sitesine aittir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">6. Değişiklikler</h2>
              <p className="mb-4">
                Bu kullanım şartları zaman zaman değiştirilebilir. Önemli değişiklikler bu sayfada ilan edilecektir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">7. İletişim</h2>
              <p className="mb-4">
                Kullanım şartlarıyla ilgili sorularınız için:
              </p>
              <p className="mb-4">
                <strong className="text-[#F97316]">E-posta:</strong> icnevudila@gmail.com<br />
                <strong className="text-[#F97316]">Telegram:</strong> @icnevudila
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

