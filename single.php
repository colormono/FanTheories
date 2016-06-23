<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package mrrobot
 */

get_header(); ?>

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
                    <figure>
                    	<?php if( has_post_thumbnail() ): ?>
                        <?php the_post_thumbnail(); ?>
                    	<?php else : ?>
                        <img src="<?php bloginfo('template_url'); ?>/img/photos/photo-01.jpg" alt="">
                    	<?php endif; ?>
                    </figure>
                </hgroup>
                <div class="body">
                	<?php the_content(); ?>
                </div>
            </article>

            <div class="share">
                <ul>
                    <li><a href="#" class="btn btn-rojo">VOTAR</a></li>
                    <li class="icon"><a href="#"><i class="icon icon-facebook-square"></i></a></li>
                    <li class="icon"><a href="#"><i class="icon icon-twitter-square"></i></a></li>
                </ul>
            </div>

			<?php 
				// Comments
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
			?>

		<?php endwhile; ?>

        </div><!-- /#single -->
    </div><!-- /.single -->

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php bloginfo('template_url'); ?>/js/vendor/jquery.js"><\/script>')</script>
    <?php wp_footer(); ?>

<?php
get_footer();
