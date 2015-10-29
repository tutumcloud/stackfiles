FROM alpine:edge

RUN ["apk", "add", "--update", "ca-certificates"]
ADD crawler /
RUN chmod +x crawler
ENTRYPOINT ["/crawler"]
