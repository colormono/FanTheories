<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package mrrobot
 */

get_header(); ?>

    <div id="preload"><span></span></div>
    <div id="app"></div>
    <footer id="footer">Sound Player</footer>
    
    <div id="debug">
        <div id="stats"></div>
        <div id="gui"></div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.js"><\/script>')</script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.magnific-popup.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/pixi.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/dat.gui.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/stats.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/plugins/CSSPlugin.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/easing/EasePack.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/TweenLite.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/tink.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/charm.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/functions/PixiPlugin.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/BlueRaiseFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/CutSliderFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/NoiseFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/app.js"></script>

    <?php wp_footer(); ?>

<?php
get_footer();
