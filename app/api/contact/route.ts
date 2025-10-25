import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Resend API key kontrolü
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // E-posta gönder
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend'den verilen domain
      to: ['icnevudila@gmail.com'],
      replyTo: email,
      subject: `Portfolio İletişim: ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <hr>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { success: false, error: 'Mesaj gönderilemedi' },
      { status: 500 }
    )
  }
}

