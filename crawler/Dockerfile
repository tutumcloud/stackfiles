FROM alpine:edge

ENV SCHEDULE_TIME 10

ADD crawler /
RUN chmod +x crawler
ENTRYPOINT ["/crawler"]
