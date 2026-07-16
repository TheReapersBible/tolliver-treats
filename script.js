/* ===========================
TABLET RESPONSIVE STYLES
=========================== */

@media (max-width: 1000px){

.site-header{

padding:0 30px;

}

.hero{

padding:120px 6% 80px;

}

.hero h1{

font-size:4rem;

}

.section{

padding:80px 6%;

}

.intro{

grid-template-columns:1fr;

gap:25px;

}

.order-section{

grid-template-columns:1fr;

gap:45px;

}

.order-copy{

position:static;

}

.product-grid{

grid-template-columns:1fr;

}

.gallery-grid{

grid-template-columns:1fr 1fr;

grid-template-rows:350px 250px;

}

.gallery-large{

grid-column:1/3;

grid-row:auto;

}

}

/* ===========================
MOBILE NAVIGATION
=========================== */

@media (max-width: 760px){

.site-header{

height:72px;

padding:0 18px;

}

.brand{

font-size:1rem;

gap:10px;

}

.brand img{

width:46px;

height:46px;

}

.menu-toggle{

display:block;

}

.nav-links{

position:absolute;

top:72px;

left:0;

width:100%;

display:none;

flex-direction:column;

align-items:stretch;

gap:8px;

padding:18px;

background:var(--cream);

border-bottom:1px solid var(--border);

box-shadow:0 15px 30px rgba(0,0,0,.08);

}

.nav-links.open{

display:flex;

}

.nav-links a{

padding:12px;

text-align:center;

border-radius:10px;

}

.nav-links a:hover{

background:var(--pink-light);

}

.cart-button{

width:100%;

justify-content:center;

}

/* ===========================
MOBILE HERO
=========================== */

.hero{

min-height:85vh;

padding:120px 20px 70px;

background-position:center;

}

.hero h1{

font-size:3.2rem;

}

.hero p{

font-size:1rem;

}

.hero-actions{

flex-direction:column;

}

.hero-actions .button{

width:100%;

}

/* ===========================
MOBILE GENERAL SECTIONS
=========================== */

.section{

padding:65px 20px;

}

.intro h2,
.section-heading h2,
.order-copy h2{

font-size:2.35rem;

}

.section-heading{

margin-bottom:40px;

}

/* ===========================
MOBILE PRODUCT CARDS
=========================== */

.product-grid{

grid-template-columns:1fr;

gap:28px;

}

.product-card{

border-radius:20px;

}

.product-image{

height:250px;

}

.product-content{

padding:24px;

}

.product-content h3{

font-size:1.7rem;

}

.quantity-row{

flex-direction:column;

align-items:stretch;

}

.quantity-row label{

display:flex;

justify-content:space-between;

align-items:center;

}

.quantity-row select{

min-width:110px;

}

/* ===========================
MOBILE GALLERY
=========================== */

.gallery-grid{

grid-template-columns:1fr;

grid-template-rows:repeat(3,260px);

gap:15px;

}

.gallery-large{

grid-column:auto;

}

/* ===========================
MOBILE ORDER FORM
=========================== */

.order-form{

padding:24px;

border-radius:20px;

}

fieldset{

flex-direction:column;

gap:12px;

}

.notice{

font-size:.95rem;

}

/* ===========================
MOBILE FOOTER
=========================== */

footer{

flex-direction:column;

align-items:flex-start;

padding:38px 20px;

}

/* ===========================
MOBILE CART
=========================== */

.cart-drawer{

padding:22px;

}

.cart-item{

grid-template-columns:62px 1fr;

}

.cart-item img{

width:62px;

height:62px;

}

.remove-item{

grid-column:2;

justify-self:start;

}

/* ===========================
MOBILE DIALOG
=========================== */

dialog{

padding:28px 22px;

}

dialog h2{

font-size:2rem;

}

.dialog-actions{

flex-direction:column;

}

.dialog-actions .button{

width:100%;

}

}

/* ===========================
SMALL PHONE ADJUSTMENTS
=========================== */

@media (max-width: 430px){

.hero h1{

font-size:2.7rem;

}

.brand span{

display:none;

}

.site-header{

padding:0 14px;

}

.section{

padding-left:16px;

padding-right:16px;

}

.product-content{

padding:20px;

}

.order-form{

padding:20px;

}

.cart-drawer{

padding:18px;

}

}

/* ===========================
ACCESSIBILITY AND MOTION
=========================== */

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible{

outline:3px solid rgba(184,79,96,.35);

outline-offset:3px;

}

@media (prefers-reduced-motion: reduce){

html{

scroll-behavior:auto;

}

*{

animation-duration:.01ms !important;

animation-iteration-count:1 !important;

transition-duration:.01ms !important;

}

}
