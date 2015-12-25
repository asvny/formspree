
FORMSPREE
------------

Functional HTML forms.
#### Ported https://github.com/asm-products/formspree to `Node.js`

Just send your form to our URL and we'll forward it to your email. No PHP, Javascript or sign up required — perfect for static sites!
Example:

    <form action="//localhost:1337/you@email.com" method="POST" >
        <input type="text" name="name">
        <input type="email" name="_replyto">
        <input type="submit" value="Send">
    </form>

Setting it up is easy and free. Here's how:

You don't even have to register.

## 1. Setup the HTML form

Change your form's action-attribute to this and replace your@email.com with your own email.

## 2. Submit the form and confirm your email address

Go to your website and submit the form once. This will send you an email asking to confirm your email address, so that no one can start sending you spam from random websites.

## 3. All set, receive emails

From now on, when someone submits that form, we'll forward you the data as email.

## Advanced features:

Form inputs can have specially named name-attributes, which alter functionality. They are all prefixed with an underscore.

### _replyto

This value is used for the email's Reply-To field. This way you can directly "Reply" to the email to respond to the person who originally submitted the form.

### _next

By default, after submitting a form the user is shown the Formspree "Thank You" page. You can provide an alternative URL for that page.

### _subject

This value is used for the email's subject, so that you can quickly reply to submissions without having to edit the subject line each time.

### _cc

This value is used for the email's CC Field. This lets you send a copy of each submission to another email address.

### _gotcha

Add this "honeypot" field to avoid spam by fooling scrapers. If a value is provided, the submission will be silently ignored. The input should be hidden with CSS.

