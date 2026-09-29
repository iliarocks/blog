(define (render-home)
  (render-page "Ilia" "en"
    `(main (@ (class "home"))
       (p "I care about close friendships, work that means something to me, and staying curious about things I don’t yet understand. I’m trying to follow those interests with more commitment and less second-guessing. This is where I share what I’m up to, what I’m making, and the questions and ideas I keep coming back to. I’d be glad if something here became the start of a conversation 🙂")
       (address
         (a (@ (href "mailto:me@ilia.page")) "Email")
         (a (@ (href "https://github.com/iliarocks")) "GitHub")))))
