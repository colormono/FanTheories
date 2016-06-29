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

    <div id="join" class="single mfp-hide modal">

        <article class="article article-page">

            <?php //the_content(); ?>

            <form name="suscribite" action="<?php bloginfo('template_url'); ?>/ins.php" method="POST" id="register-form">

                <h4>Join FSOCIETY</h4>

                <div class="container" id="form">

                    <input type="hidden" id="frmFecha" name="frmFecha" value="<?php echo date('Y-m-d H:i:s'); ?>">

                    <div class="form-group">
                        <label for="frmNombre">Nombre</label>
                        <input id="frmNombre" name="frmNombre" type="text" required>
                    </div>

                    <div class="form-group">
                        <label for="frmEmail">Email</label>
                        <input id="frmEmail" name="frmEmail" type="email" required>
                    </div>

                    <div class="form-group submit">
                        <input class="btn btn-primary" type="submit" value="SUSCRIBETE">
                    </div>

                </div><!-- /.container -->
                <div id="respuesta"></div>
            </form>

        </article>

    </div><!-- /.single -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.js"><\/script>')</script>
    <?php //if( is_front_page() ): ?>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.magnific-popup.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/pixi.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/dat.gui.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/stats.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/plugins/CSSPlugin.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/easing/EasePack.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/gsap/TweenLite.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/charm.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/howler.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.validate.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/vendor/messages_es_AR.min.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/functions/PixiPlugin.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/BlueRaiseFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/CutSliderFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/shaders/NoiseFilter.js"></script>
    <script src="<?php bloginfo('template_url'); ?>/js/app.js"></script>
    <?php //endif; ?>
    <?php wp_footer(); ?>

</body>
</html>