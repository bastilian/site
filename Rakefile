task default: %w[test]

task :test do
  puts "\nBuilding project"
  try 'middleman build --verbose'
end

task :deploy do
  puts "\nCopying GitHub-specific files"
  try 'cp -rv ./github/* ./build/'

  puts "\nDeploying to GitHub"
  try 'middleman deploy --verbose'
end

namespace :travis do
  task :script do
    Rake::Task['test'].invoke
  end

  task :after_success do
    puts "\nRunning Travis Deployment"
    puts "\nSetting up Git access"
    try 'echo ${GH_TOKEN} > ./.git/credentials'
    try 'git config --global user.name ${GH_USER}'
    try 'git config --global user.email ${GH_EMAIL}'
    try 'git remote set-url origin "https://${GH_TOKEN}@github.com/unruly/unruly.github.io.git"'

    Rake::Task['deploy'].invoke
  end
end

def try(command)
  system command
end