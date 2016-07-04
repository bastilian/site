# Source for bastilian.me

Based on Middleman, wrapped in a docker container.

## Requirements

* Ruby 2.2.3
* Node.js

## Installation

### with Docker

The Docker container will have everything you need to run the site locally. It has Ruby, Node.js and all required Ruby gems installed once it's built.

```shell
$ docker-compose build
$ docker-compose up server
```

### without Docker

Your system will need to have the above mentioned requirements install, Ruby with Bundler and Node.js so you can run the following commands

```shell
$ bundle install
$ bundle exec middleman server
```

Open the site on `http://IP:4567`*

_* `IP` is either your Docker IP or localhost._

## Contribute

Even though it is my personal site I welcome contributions of any kind, that improve the site, be it new ideas, bug reports or fixes you find. You can always [open an issue](https://github.com/bastilian/site/issues/new) or submit a pull request.

### Suggest a blog post

I may blog at some point on <http://bastilian.me>, if you have a topic in mind you'd like to hear about, feel free to open and issue as well and suggest a topic.

## License

MIT License

Copyright (c) 2016 Sebastian Gräßl <sebastian@validcode.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
