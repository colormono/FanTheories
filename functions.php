<?php
/**
 * mrrobot functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package mrrobot
 */

if ( ! function_exists( 'mrrobot_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function mrrobot_setup() {

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'mrrobot' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

}
endif;
add_action( 'after_setup_theme', 'mrrobot_setup' );

/**
 * Enqueue scripts and styles.
 */
function mrrobot_scripts() {
	//wp_enqueue_style( 'mrrobot-style', get_stylesheet_uri() );
	//wp_enqueue_script( 'mrrobot-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );
	// if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
	// 	wp_enqueue_script( 'comment-reply' );
	// }
}
add_action( 'wp_enqueue_scripts', 'mrrobot_scripts' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/* Change Mystery man avatar */
add_filter( 'avatar_defaults', 'newgravatar' );

function newgravatar($avatar_defaults) {
    //$myavatar = get_bloginfo('template_directory') . '/img/avatar-default.jpg';
    $myavatar = "mrrobot.spacego.tv/wp-content/themes/mrrobot/img/avatar-default.jpg";
    $avatar_defaults[$myavatar] = "Own";
    return $avatar_defaults;
}




/**
 * Remove wlwmanifest from header
 */
remove_action( 'wp_head', 'wlwmanifest_link' );

/**
 * Remove generator from header
 */
remove_action( 'wp_head', 'wp_generator' );

/**
 * Remove default RSS meta
 */
remove_action( 'wp_head', 'rsd_link' );

/**
 * Remove WordPress' canonical links
 */
remove_action( 'wp_head', 'rel_canonical' );

/**
 * Remove WordPress' short link
 */
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

/**
 * Remove WordPress' link rel=’prev’ and link rel=’next’
 */
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' );
remove_action( 'wp_head', 'start_post_rel_link' );

/**
 *	Replace WordPress login logo with your own
 *	@link http://www.rickrduncan.com/wordpress/white-label-wordpress
 */
add_action('login_head', 'b3m_custom_login_logo');
function b3m_custom_login_logo() {
	echo '<style type="text/css">
		body.login{
			background: #000;
			height: auto;
			min-height: 100%;
		}
		.login h1 {
			margin-bottom: 1em;
		}
		.login form {
			-webkit-box-shadow: 0 1px 10px rgba(0,0,0,.13);
			box-shadow: 0 1px 10px rgba(0,0,0,.13);
		}
		.login h1 a { 
			background-image:url('.get_stylesheet_directory_uri().'/img/logo-mrrobot-rojo.png) !important;
			-webkit-background-size: 200px;
			-moz-background-size: 200px;
			-o-background-size: 200px;
			background-size: contain !important;
			background-position: center center !important;
			height: 31px !important;
			width: 200px !important;
			margin-bottom: 0 !important;
			padding-bottom: 0 !important;
		}
		p.register{
			display: none;
		}
		.wp-core-ui .button.button-primary{
			background: #ed0532;
			border-color: #b10325;
			color: #fff;
			text-decoration: none;
			text-shadow: none !important;
			-moz-text-shadow: none !important;
			-webkit-text-shadow: none !important;
			-o-text-shadow: none !important;
			box-shadow: 0 1px 0 #e68219;
		}
		.wp-core-ui .button-primary:hover,
		.wp-core-ui .button-primary:focus,
		.wp-core-ui .button-primary:active{
			background: #ed0532;
			border-color: #b10325;
			color: #fff;
			text-decoration: none;
		}
		.login form {
			margin-top: 10px !important;
			border-radius: 6px;
		}
	</style>';
}

/**
 * Remove .recentcomments from head
 */
function remove_wp_widget_recent_comments_style() {
   if ( has_filter('wp_head', 'wp_widget_recent_comments_style') ) {
      remove_filter('wp_head', 'wp_widget_recent_comments_style' );
   }
}
add_filter( 'wp_head', 'remove_wp_widget_recent_comments_style', 1 );

/**
 *	Change the WordPress login page logo link 
 *	@link https://wordpress.org/support/topic/how-to-change-the-wordpress-login-page-logo-link
 */
function loginpage_custom_link() {
	return home_url();
}
add_filter('login_headerurl','loginpage_custom_link');

function change_title_on_logo() {
	return 'Canal de Panamá';
}
add_filter('login_headertitle', 'change_title_on_logo');


/**
 *	Remove WordPress Welcome Panel
 *	@link http://wpsnippy.com/how-to-remove-wordpress-dashboard-welcome-panel/
 */
remove_action('welcome_panel', 'wp_welcome_panel');

/**
 *	Disable Default Dashboard Widgets
 *	@link http://digwp.com/2014/02/disable-default-dashboard-widgets/
 */
function my_custom_dashboard_widgets() {
	global $wp_meta_boxes;
	// wp..
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
	//unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
	unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
	unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
	//unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']);
	// bbpress
	unset($wp_meta_boxes['dashboard']['normal']['core']['bbp-dashboard-right-now']);
	// yoast seo
	unset($wp_meta_boxes['dashboard']['normal']['core']['yoast_db_widget']);
	// gravity forms
	unset($wp_meta_boxes['dashboard']['normal']['core']['rg_forms_dashboard']);
}
add_action('wp_dashboard_setup', 'my_custom_dashboard_widgets', 999);

/**
 *	Modify the admin footer text
 *	@link http://www.rickrduncan.com/wordpress/white-label-wordpress
 */
function remove_footer_admin () {
	echo '<span id="footer-thankyou">Handcrafted by SocialSnack.com</span>';
}
add_filter('admin_footer_text', 'remove_footer_admin');

/**
 *	Remove WordPress Logo From Admin Bar
 *	@link http://stanislav.it/how-to-remove-wordpress-logo-from-admin-bar/
 */
add_action('admin_bar_menu', 'remove_wp_logo', 999);
function remove_wp_logo( $wp_admin_bar ) {
	$wp_admin_bar->remove_node('wp-logo');
}

/**
 *	Remove help options
 *	@link http://wordpress.stackexchange.com/questions/25034/how-to-remove-screen-options-and-help-links-in-the-admin-area
 */
add_filter( 'contextual_help', 'remove_help_tab', 999, 3 );
function remove_help_tab($old_help, $screen_id, $screen){
    $screen->remove_help_tabs();
    return $old_help;
}

/**
 * Hide admin notifications for all users except admin
 * http://premium.wpmudev.org/blog/hide-the-wordpress-update-notification/
 */
function hide_update_notice_to_all_but_admin_users() { 
	if (!current_user_can('update_core')) { 
		remove_action( 'admin_notices', 'update_nag', 3 ); 
	} 
} 
add_action( 'admin_head', 'hide_update_notice_to_all_but_admin_users', 1 );
