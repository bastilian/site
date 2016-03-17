activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true
end

set :css_dir,    'stylesheets'
set :js_dir,     'javascripts'
set :images_dir, 'images'

configure :build do
  activate :minify_css
  activate :bower
  activate :minify_javascript
  activate :relative_assets
end
