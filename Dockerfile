FROM ruby:2.2.3

RUN apt-get update -qq && apt-get install -y nodejs
RUN echo "    IdentityFile ~/.ssh/id_rsa" >> /etc/ssh/ssh_config

ENV SITE_DIR=/site

RUN mkdir $SITE_DIR
WORKDIR $SITE_DIR

COPY Gemfile* $SITE_DIR/
RUN bundle install

ADD $SSH_FILE $HOME/.ssh/id_rsa
ADD . $SITE_DIR

EXPOSE 4567
CMD bash
