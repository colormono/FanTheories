<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package mrrobot
 */

get_header(); ?>

    <header id="header">
        <hgroup>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php bloginfo('template_url'); ?>/img/logo-mrrobot-rojo.png" alt="Mr. Robot"></a>
            <span>////ESTRENO////<br>JUEVES 14 DE JULIO 23HS.</span>
        </hgroup>
        <aside>
            <a href="http://www.spacego.tv/" target="_blank" class="space"><img src="<?php bloginfo('template_url'); ?>/img/logo-space.png" alt="Space"></a>
            <a href="#" target="_blank" class="temporada"><img src="<?php bloginfo('template_url'); ?>/img/ui/btn-temporada1.png" alt="Temporada 1"></a>
        </aside>
    </header>

    <div class="section">
        <div id="single" class="single">

        <?php while ( have_posts() ) : the_post(); ?>
            <article class="article">

                <hgroup class="title">
                    <h3>
                        <small>Fan_theory</small> 
                        <strong>DESTACADA</strong>
                    </h3>
                    <h1><?php the_title(); ?></h1>
                </hgroup>

                <figure>
                    <?php if( has_post_thumbnail() ): ?>
                    <?php the_post_thumbnail(); ?>
                    <?php else : ?>
                    <img src="<?php bloginfo('template_url'); ?>/img/photos/photo-01.jpg" alt="">
                    <?php endif; ?>
                </figure>

                <div class="body">
                	<?php the_content(); ?>
                </div>

                <?php 
                    // Comments
                    if ( comments_open() || get_comments_number() ) :
                        comments_template();
                    endif;
                ?>

            </article>
		<?php endwhile; ?>

        </div><!-- /.single -->
    </div><!-- /.section -->

    <footer id="footer">
        <p><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="btn">Ver todas las teorías</a></p>
    </footer>

<?php
get_footer();
