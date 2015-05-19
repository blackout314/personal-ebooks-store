<?php
define( LANG, 'it' );
include 'locale/' . LANG . '-message.php';
include 'config.php';


$do = addslashes($_GET['do']);
switch( $do ){
	// download case
	//
	case 'download':
		break;

	// notify case
	//
	case 'notify':
        	echo '?download='.$_GET['micro'];
		break;

	// buy case
	//
	case 'buy':
		$id 	= addslashes( $_GET['id'] );
		$p 	= $ebooks[ $id ];
		?>
		<div class="nav">
			<a href="index.php"><?=$msg['back'] ?></a>
		</div>
		<div class="book">
			<form name="form" action="https://www.<?=SANDBOX ?>paypal.com/cgi-bin/webscr" method="post" target="_top">
			<input type="hidden" name="cmd" value="_xclick">
			<input type="hidden" name="business" value="<?=PAYPAL_ADDR ?>">
			<input type="hidden" name="item_name" value="<?=$p['title'] ?>">
			<input type="hidden" name="return" value="<?=ORDER_FORM_URL ?>">
			<input type="hidden" name="cancel_return" value="<?=ORDER_FORM_CANCEL ?>">
			<input type="hidden" name="no_note" value="1">
			<input type="hidden" name="currency_code" value="<?=$p['valuta'] ?>">
			<input type="hidden" name="lc" value="<?=$p['country'] ?>">
			<input type="hidden" name="bn" value="PP-BuyNowBF">
			<input type="hidden" name="amount" value="<?=$p['price'] ?>">
			<input type="hidden" name="notify_url" value="<?=ORDER_FORM_URL ?>">
			<div>
				<div id="title"><?=$p['title'] ?></div>
				<div id="descr"><?=$p['descr'] ?></div>
				<div id="price"><?=$p['price'].' '.$p['valuta'] ?></div>
			</div>
			<input type="submit" value="<?=$msg['submit'] ?>" id="payNowSubmit">
			</form>
		</div>
		<?php
		break;

	// default case
	//
	default:
		foreach( $ebooks as $k=>$ebook ) {
			echo '
			<div class="book">
				<a href="?do=buy&id=' .$k. '">' .$ebook['title']. '</a>
			</div>
			';
		}
		break;

} // -- end switch
?>
