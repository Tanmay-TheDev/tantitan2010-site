# Domain email

The site now has a real Netlify Forms contact flow and uses an explicit configuration file rather than inventing an email address. A domain mailbox such as `contact@your-domain.tld` still requires a domain you control and an email provider/mailbox or forwarding service.

After the domain is chosen, configure the provider's MX/SPF/DKIM records and route Netlify Forms notifications to the chosen mailbox. This project deliberately does not hard-code a fake mailbox or DNS records for a domain that was not supplied.
