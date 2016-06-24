<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package mrrobot
 */

?>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.js"><\/script>')</script>
    <?php if( is_front_page() ): ?>
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
    <?php endif; ?>
    <?php wp_footer(); ?>

</body>
</html>