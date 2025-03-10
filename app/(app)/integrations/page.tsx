/*
<ai_context>
This server page returns a simple "Contact Page" component as a (marketing) route.
</ai_context>
*/

"use server"

export default async function ContactPage() {
  return (
    <div>
      Integrations
      <p>
        Here we handle the user’s integrations, like Smartlead or EmailBison.
      </p>
    </div>
  )
}
