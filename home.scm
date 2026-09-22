(define (render-home)
  (render-page "Ilia" "en"
    `(body
       (main (@ (class "home"))
         (header
           (img (@ (src "/avatar.jpg") (alt "") (width 64) (height 64)))
           (div
             (h1 "Ilia Parunashvili")
             (address
               (a (@ (href "mailto:me@ilia.page")) "Email")
               (a (@ (href "https://github.com/iliarocks")) "GitHub"))))
         (p "I’m a Georgian-Canadian taking a semester off university to be in San Francisco. I care about close friendships, work that means something to me, and staying curious about this gs I don’t yet understand. I’m trying to follow those interests with more commitment and less second-guessing. I write here to work through questions I haven’t settled, and share photographs and things I’ve made. I’d be glad if something here became the start of a conversation.")
         ,navigation))))
