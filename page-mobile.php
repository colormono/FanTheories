<?php
/**
 * Template name: mobile
 *
 * @package mrrobot
 */

get_header(); ?>

    <?php get_template_part( 'template-parts/header' ); ?>

    <div class="section">
        <div id="single" class="single">
        <?php 
        // the query
        $teorias = array(
            'post_type' => 'post',
            'posts_per_page' => -1
        );
        
        $query_teorias = new WP_Query( $teorias );
        if ( $query_teorias->have_posts() ) :
            while ( $query_teorias->have_posts() ) : $query_teorias->the_post();

        ?>
            <article class="article">

                <hgroup class="title">
                    <?php if( get_field('destacada') ): ?>
                    <h3>
                        <small>Fan_theory</small> 
                        <strong>DESTACADA</strong>
                    </h3>
                    <?php endif; ?>
                    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                </hgroup>

                <figure>
                    <a href="<?php the_permalink(); ?>">
                    <?php if( has_post_thumbnail() ): ?>
                    <?php the_post_thumbnail(); ?>
                    <?php else : ?>
                    <img src="<?php bloginfo('template_url'); ?>/img/photos/photo-01.jpg" alt="">
                    <?php endif; ?>
                    </a>
                </figure>

            </article>
        <?php 
            endwhile; 
            wp_reset_postdata();
        endif; 
        ?>
        </div><!-- /.single -->
    </div><!-- /.section -->

<?php
get_footer();
