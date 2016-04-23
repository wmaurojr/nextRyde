<header id="header" class="banner">
  <div class="container">
    <a id="headerLogo" class="brand" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    <a id="navToggle" href="#mm-0"><i style="color: white;" class="fa fa-bars fa-4x" aria-hidden="true"></i>
</a>
    <nav class="nav-primary">
      <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav',
          'menu_id' => 'main-menu']);
      endif;
      ?>
    </nav>
  </div>
</header>
