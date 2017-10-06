<?php
/*
 * Plugin Name: Lightseek Mobile Menu
 * Plugin URI: http://iseek.ie/
 * Description: Fast modern mobile menu for Lightseek theme.
 * Version: 0.3.0
 * Author: Slawek Amielucha
 * Author URI: https://amielucha.com
 * Text Domain: lightmenu
 */
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly
}

add_action( 'wp_enqueue_scripts', 'lightmenu_scripts' );

function lightmenu_scripts() {
  //wp_enqueue_script( 'lightmenu', plugin_dir_url( __FILE__ ) . 'lightseek-menu/src/js/lightseek-menu.js', false, null );

  // Get the script URL from the manifest file
  $json = file_get_contents( plugin_dir_path( __FILE__ ) . 'lightmenu/build/asset-manifest.json' );
  $scriptFile =  json_decode($json, true);
  wp_enqueue_script( 'lightmenu', plugin_dir_url( __FILE__ ) . 'lightmenu/build/' . $scriptFile['main.js'], false, null );
  wp_enqueue_style( 'lightmenu', plugin_dir_url( __FILE__ ) . 'lightmenu/build/' . $scriptFile['main.css'] );

  /* Localize the main script */
  $site_info = array(
    'site_url' => get_site_url(),
    'theme_directory' => get_template_directory_uri()
  );

  wp_localize_script( 'lightmenu', 'siteInfo', $site_info );
}

function lightmenu_defer_attribute($tag, $handle) {
    if ( 'lightmenu' !== $handle )
        return $tag;
    return str_replace( ' src', ' defer src', $tag );
}
add_filter('script_loader_tag', 'lightmenu_defer_attribute', 10, 2);

function lightmenu_insert() {
?>
  <div id="lightmenu" class="lightmenu-container-outer lightmenu-wp"></div>
<?php
  //<button style="position: fixed; z-index: 980; bottom: 2rem; right: 2rem;" onclick="store.dispatch({type: 'SHOW_MENU'});">Open the Menu</button>
}
add_action('wp_footer', 'lightmenu_insert');

/*
 * The code below has been borrowed from WP REST API Menus
 * by Fulvio Notarstefano
 * https://github.com/unfulvio
 */

include_once 'lightmenu/includes/wp-api-menus-v2.php';

if ( ! function_exists ( 'wp_rest_menus_init' ) ){
  /**
   * Init JSON REST API Menu routes.
   *
   * @since 1.0.0
   */
  function wp_rest_menus_init() {
    if ( ! defined( 'JSON_API_VERSION' ) && ! in_array( 'json-rest-api/plugin.php', get_option( 'active_plugins' ) ) ) {
      $class = new WP_REST_Menus();
      add_filter( 'rest_api_init', array( $class, 'register_routes' ) );
    }
  }
  add_action( 'init', 'wp_rest_menus_init' );

}
