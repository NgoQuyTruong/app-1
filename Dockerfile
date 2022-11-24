FROM ruby:3.0.1

# Install 3rd party dependencies.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt -y install nodejs \
    yarn \
    build-essential \
    libpq-dev

RUN mkdir /app
WORKDIR /app

COPY  ./*.sh /scripts/
RUN chmod +x /scripts/*.sh