"use server"

interface EmailQuoteParams {
  to: string
  customerName: string
  licensePlate: string
  amount: number
  validUntil: string
  vehicleDetails?: string
}

export async function sendQuoteEmail({
  to,
  customerName,
  licensePlate,
  amount,
  validUntil,
  vehicleDetails = "",
}: EmailQuoteParams) {
  try {
    // Format the amount as currency
    const formattedAmount = new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount)

    // Format the valid until date
    const formattedDate = new Date(validUntil).toLocaleDateString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    // Email content
    const subject = `Uw offerte van Van Velzen Autorecycling voor kenteken ${licensePlate}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0078b4; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Van Velzen Autorecycling</h1>
          <p style="margin: 10px 0 0;">Uw offerte voor kenteken ${licensePlate}</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <p>Geachte ${customerName},</p>
          
          <p>Hartelijk dank voor uw aanvraag bij Van Velzen Autorecycling. Wij hebben het genoegen u een offerte aan te bieden voor uw auto met kenteken ${licensePlate}.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h2 style="margin-top: 0; color: #0078b4;">Offerte details</h2>
            <p><strong>Kenteken:</strong> ${licensePlate}</p>
            ${vehicleDetails ? `<p><strong>Voertuig:</strong> ${vehicleDetails}</p>` : ""}
            <p><strong>Aangeboden bedrag:</strong> ${formattedAmount}</p>
            <p><strong>Geldig tot:</strong> ${formattedDate}</p>
          </div>
          
          <p>Om deze offerte te accepteren of als u vragen heeft, kunt u contact met ons opnemen via telefoonnummer 06-86301771 of door te reageren op deze e-mail.</p>
          
          <p>Wij bieden de volgende diensten aan bij acceptatie van deze offerte:</p>
          <ul>
            <li>Gratis ophaalservice in heel Nederland</li>
            <li>Directe RDW vrijwaring</li>
            <li>Contante betaling mogelijk</li>
            <li>Milieuvriendelijke recycling</li>
          </ul>
          
          <p>Met vriendelijke groet,</p>
          <p>Team Van Velzen Autorecycling</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          <p>Van Velzen Autorecycling | Lau Mazirelweg 8, 2629 HW - Delft | 06-86301771 | info@vanvelzenautorecycling.nl</p>
        </div>
      </div>
    `

    // Use Resend API or another email service API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SMTP_PASSWORD}`, // Using SMTP_PASSWORD as API key
      },
      body: JSON.stringify({
        from: process.env.SMTP_FROM || "send@vanvelzenautorecycling.nl",
        to,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Email API error: ${errorData.message || response.statusText}`)
    }

    return { success: true, messageId: `email-${Date.now()}` }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: (error as Error).message }
  }
}
