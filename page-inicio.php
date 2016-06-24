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
    <footer id="audio"></footer>
    
    <div id="debug">
        <div id="stats"></div>
        <div id="gui"></div>
    </div>

<?php
get_footer();
