FROM alpine:edge

RUN ["apk", "add", "--update", "ca-certificates"]
ADD migration /
RUN chmod +x migration
ENTRYPOINT ["/migration"]
