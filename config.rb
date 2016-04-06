require 'lib/custom_helpers'
helpers CustomHelpers

sprockets.append_path File.join "#{root}", 'bower_components'

set :css_dir,    'stylesheets'
set :js_dir,     'javascripts'
set :images_dir, 'images'

configure :build do
  activate :minify_css
  activate :minify_javascript
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true
end

activate :blog do |blog|
  blog.prefix = 'events'
end

activate :directory_indexes
