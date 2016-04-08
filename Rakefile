task default: %w[test]

task :test do
  puts "\nBuilding project"
  system 'middleman build --verbose'
end

task :deploy do
  puts "\nCopying GitHub-specific files"
  system 'cp -rv ./github/* ./build/'

  puts "\nDeploying to GitHub"
  system 'middleman deploy --verbose'
end

namespace :travis do
  task :script do
    Rake::Task['test'].invoke
  end

  task :after_success do
    puts "\nRunning Travis Deployment"
    puts "\nSetting up Git access"
    system 'echo ${GH_TOKEN} > ./.git/credentials'
    system 'git config --global user.name ${GH_USER}'
    system 'git config --global user.email ${GH_EMAIL}'
    system 'git remote set-url origin "https://${GH_TOKEN}@github.com/unruly/unruly.github.io.git"'

    Rake::Task['deploy'].invoke
  end
end
