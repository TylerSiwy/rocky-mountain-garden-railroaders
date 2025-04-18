<?php
require_once('res/x5engine.php');

$pa = imPrivateArea::getInstance();
if (isset($_POST['imUname']) && isset($_POST['imPwd'])) {
	$result = $pa->login($_POST['imUname'], $_POST['imPwd']);
	if ($result < 0) {
		header('Location: imlogin.php?loginstatus=' . $result);
		exit();
	}
	$page = $pa->getSavedPage() ? $pa->getSavedPage() : $pa->getLandingPage();
	$pa->sessionSafeRedirect($page);
}
?><!DOCTYPE html><!-- HTML5 -->
<html prefix="og: http://ogp.me/ns#" lang="en-GB" dir="ltr">
	<head>
		<title>Reserved Access - Rocky Mountain Garden Railroaders</title>
		<meta charset="utf-8" />
		<!--[if IE]><meta http-equiv="ImageToolbar" content="False" /><![endif]-->
		<meta name="author" content="RMGR" />
		<meta name="generator" content="Incomedia WebSite X5 Evolution 12.0.10.32 - www.websitex5.com" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="favicon.png?12-0-10-32-636367413299884050" type="image/png" />
		<link rel="stylesheet" type="text/css" href="style/reset.css?12-0-10-32" media="screen,print" />
		<link rel="stylesheet" type="text/css" href="style/print.css?12-0-10-32" media="print" />
		<link rel="stylesheet" type="text/css" href="style/style.css?12-0-10-32" media="screen,print" />
		<link rel="stylesheet" type="text/css" href="style/template.css?12-0-10-32" media="screen" />
		<link rel="stylesheet" type="text/css" href="style/menu.css?12-0-10-32" media="screen" />
		<!--[if lte IE 7]><link rel="stylesheet" type="text/css" href="style/ie.css?12-0-10-32" media="screen" /><![endif]-->
		
		<script type="text/javascript" src="res/jquery.js?12-0-10-32"></script>
		<script type="text/javascript" src="res/x5engine.js?12-0-10-32" data-files-version="12-0-10-32"></script>
		
		
		
		<script type="text/javascript">
			x5engine.boot.push(function () { x5engine.utils.checkBrowserCompatibility(); });
		</script>
		
	</head>
	<body>
		<div id="imHeaderBg"></div>
		<div id="imFooterBg"></div>
		<div id="imPage">
			<div id="imHeader">
				<h1 class="imHidden">Reserved Access - Rocky Mountain Garden Railroaders</h1>
				
			</div>
			<a class="imHidden" href="#imGoToCont" title="Skip the main menu">Go to content</a>
			<a id="imGoToMenu"></a><p class="imHidden">Main menu:</p>
			<div id="imMnMnGraphics"></div>
			<div id="imMnMn" class="auto">
				<div class="hamburger-site-background menu-mobile-hidden"></div><div class="hamburger-button"><div><div><div class="hamburger-bar"></div><div class="hamburger-bar"></div><div class="hamburger-bar"></div></div></div></div><div class="hamburger-menu-background-container"><div class="hamburger-menu-background menu-mobile-hidden"><div class="hamburger-menu-close-button"><span>&times;</span></div></div></div>
				<ul class="auto menu-mobile-hidden">
					<li id="imMnMnNode0" class=" imPage">
						<a href="index.html">
							<span class="imMnMnFirstBg">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Home Page</span></span>
							</span>
						</a>
					</li><li id="imMnMnNode3" class=" imPage">
						<a href="contact.html">
							<span class="imMnMnFirstBg">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Contact</span></span>
							</span>
						</a>
					</li><li id="imMnMnNode4" class=" imPage">
						<a href="club-information.html">
							<span class="imMnMnFirstBg">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Club Information</span></span>
							</span>
						</a>
					</li><li id="imMnMnNode5" class=" imPage">
						<a href="hobby-information.html">
							<span class="imMnMnFirstBg">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Hobby Information</span></span>
							</span>
						</a>
					</li><li id="imMnMnNode6" class=" imPage">
						<a href="gallery.html">
							<span class="imMnMnFirstBg">
								<span class="imMnMnTxt"><span class="imMnMnImg"></span><span class="imMnMnTextLabel">Gallery</span></span>
							</span>
						</a>
					</li></ul>
			</div>
			<div id="imContentGraphics"></div>
			<div id="imContent">
				<a id="imGoToCont"></a>
				<h2 id="imPgTitle" class="imTitleMargin">Reserved Access</h2>
<div style="height: 15px;">&nbsp;</div>
				<div id="imLoginDescription">To access this WebSite section you have to enter your login details.</div>
				<div class="imLogin">
					<?php
						if (isset($_GET['loginstatus']) && $pa->messageFromStatusCode($_GET['loginstatus']) != '') {
							echo '<div class="alert alert-' . ($_GET['loginstatus'] >= 0 ? 'green' : 'red') . '">' . $pa->messageFromStatusCode($_GET['loginstatus']) . '</div>';
						}
					?>
					<form method="post" action="imlogin.php" id="imLoginForm">
						<div class="imLoginBlock">
							<label for="imUname"><span>Username:</span></label><br />
							<input type="text" name="imUname" id="imUname" class="mandatory"><br />
						</div>
						<div class="imLoginBlock">
							<label for="imPwd"><span>Password:</span></label><br />
							<input type="password" name="imPwd" id="imPwd" class="mandatory"><br />
						</div>
						<div class="imLoginBlock" style="text-align: right;">
							<input type="submit" value="Log in" class="imLoginSubmit">
						</div>
					</form>
					<script type="text/javascript">x5engine.boot.push(function() { x5engine.imForm.initForm('#imLoginForm', false, { showAll: true, offlineMessage: 'When you test your WebSite you will not be asked for the Username and Password, that will only happen once you have uploaded your WebSite.' }); });</script>
				</div>
				<script>$(function () { $("#imUname").focus(); });</script>
				<div class="imClear"></div>
			</div>
			<div id="imFooter">
				
				<div id="imFooterResponsiveContent">Copyright 2015. All rights reserved.</div>
			</div>
		</div>
		<span class="imHidden"><a href="#imGoToCont" title="Read this page again">Back to content</a> | <a href="#imGoToMenu" title="Remain on this page">Back to main menu</a></span>
		
		<noscript class="imNoScript"><div class="alert alert-red">To use this website you must enable JavaScript.</div></noscript>
	</body>
</html>
