<?php
// --- config ---

define( SANDBOX, '' );
define( PAYPAL_ADDR, 'user@paypal.com' );
define( ORDER_FORM_URL, 'http://SITE/index.php' );
define( ORDER_FORM_CANCEL, 'http://SITE/index.php' );
define( EMAIL_FROM, 'AutoShop' );
define( EMAIL_SUBJECT, 'Thank You!' );
define( EMAIL_MESSAGE, 'Thank You!' );

// array of ebooks
//
$ebooks = array(
	0 => array(
		'title' => 'BOOK',
		'img'	=> 'book.jpg',
		'path'	=> 'book.pdf',
		'descr'	=> 'example book',
		'price'	=> '2.50',
		'valuta'=> 'USD',
		'country'=> 'US',
		'dwload'=> 0,
	),
);

?>
