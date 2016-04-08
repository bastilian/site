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
  deploy.branch = 'gh-pages'

  committer_app = "#{Middleman::Deploy::PACKAGE} v#{Middleman::Deploy::VERSION}"
  commit_message = "Deployed using #{committer_app}"

  if ENV['TRAVIS_BUILD_NUMBER']
    commit_message += ' (Travis Build \##{ENV["TRAVIS_BUILD_NUMBER"]})'
  end

  deploy.commit_message = commit_message
end

activate :blog do |blog|
  blog.prefix = 'events'
end

activate :directory_indexes
