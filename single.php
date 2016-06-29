<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package mrrobot
 */

get_header(); ?>

    <?php get_template_part( 'template-parts/header' ); ?>

    <div class="section">
        <div id="single" class="single">

        <?php while ( have_posts() ) : the_post(); ?>
            <article class="article article-single">

                <hgroup class="title">
                    <?php if( get_field('destacada') ): ?>
                    <h3>
                        <small>Fan_theory</small> 
                        <strong>DESTACADA</strong>
                    </h3>
                    <?php endif; ?>
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
