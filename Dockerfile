FROM node:14.4.0-alpine as base

ARG NODE_ENV
ARG PORT
ARG MONGODB_URI

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV MONGODB_URI=$MONGODB_URI

RUN apk add --update --no-cache alpine-sdk python

WORKDIR /medium-chat-backend/

COPY package.json yarn.lock /medium-chat-backend/
RUN yarn install --pure-lockfile --ignore-engines

COPY src /medium-chat-backend/src/

EXPOSE $PORT

FROM base as development

CMD yarn dev

FROM base as production

CMD yarn start