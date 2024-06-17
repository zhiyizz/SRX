FROM node:lts-alpine
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY ./package.json ./package.json
# COPY --from=deps /app/node_modules ./node_modules

# COPY ./next.config.js ./
# Exclude ./public because it has lot of files
# COPY ./public ./public

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static
# COPY --chown=nextjs:nodejs ./.next/*.json ./.next/
# COPY --chown=nextjs:nodejs ./.next/BUILD_ID ./.next/BUILD_ID

# COPY ./data ./data

RUN chown nextjs:nodejs .next

VOLUME [ "/app/public" ]

USER nextjs

EXPOSE 3000

ENV PORT 3000

# HEALTHCHECK --interval=5s --timeout=10s --start-period=5s --retries=3 CMD wget --spider http://localhost:3000/api/hello || exit 1

CMD ["node", "server.js"]
