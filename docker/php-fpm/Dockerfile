FROM php:8.3.3-fpm

# Install Software
RUN apt-get update && apt-get install -yq gnupg supervisor && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -yq libsodium-dev libpq-dev libicu-dev git vim libzip-dev zlib1g-dev zip inetutils-ping nodejs yarn wget python3 python-is-python3 && \
    docker-php-ext-install pdo_pgsql intl exif bcmath zip && \
    wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony5/bin/symfony /usr/local/bin/symfony && \
    pecl install xdebug && \
    printf "\n" | pecl install apcu && \
    docker-php-ext-enable xdebug && \
    docker-php-ext-enable apcu && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN ln -sf /usr/local/bin/php /usr/bin/php

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure PHP & Debugging Command
COPY php.ini /usr/local/etc/php/conf.d/

WORKDIR /var/www/app
VOLUME /var/www/app

EXPOSE 9000

RUN usermod -u 1000 www-data && \
    groupmod -g 1000 www-data && \
    chown www-data:www-data /var/www

# Run

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]