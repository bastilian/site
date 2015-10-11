FROM ruby:2.2.2

RUN apt-get update -qq && apt-get install -y nodejs

ENV SITE_DIR=/site

RUN mkdir $SITE_DIR
WORKDIR $SITE_DIR

COPY Gemfile* $SITE_DIR/
RUN bundle install

ADD . $SITE_DIR
EXPOSE 4567
CMD bash
