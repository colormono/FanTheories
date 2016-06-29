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
            <article class="article article-page">

                <?php the_content(); ?>

            </article>
        <?php endwhile; ?>

        </div><!-- /.single -->
    </div><!-- /.section -->

<?php
get_footer();
