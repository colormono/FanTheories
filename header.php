<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package mrrobot
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<!--
   _________             .__       .__    _________                     __    
 /   _____/ ____   ____ |__|____  |  |  /   _____/ ____ _____    ____ |  | __
 \_____  \ /  _ \_/ ___\|  \__  \ |  |  \_____  \ /    \\__  \ _/ ___\|  |/ /
 /        (  <_> )  \___|  |/ __ \|  |__/        \   |  \/ __ \\  \___|    < 
/_______  /\____/ \___  >__(____  /____/_______  /___|  (____  /\___  >__|_ \
        \/            \/        \/             \/     \/     \/     \/     \/
-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<link rel="icon" href="<?php bloginfo('template_url'); ?>/img/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="<?php bloginfo('template_url'); ?>/img/apple-touch-icon.png">
<link rel="apple-touch-icon-precomposed" href="<?php bloginfo('template_url'); ?>/img/apple-touch-icon.png">
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/magnific-popup.css">
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/main.css">

<?php wp_head(); ?>
</head>
<body class="<?php if( is_front_page() ){ echo 'app '; } else { echo 'page '; } ?>no-debug">
    <!--[if lt IE 8]>
        <p class="browserupgrade">Disculpas, no aceptamos usuarios con IE! Muévete a un <a href="http://browsehappy.com/">navegador moderno</a> como Chrome o Firefox.</p>
    <![endif]-->
