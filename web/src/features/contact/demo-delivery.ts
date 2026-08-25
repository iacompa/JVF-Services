import type { QuoteDelivery } from "./delivery";

interface DemoDeliveryOptions {
  logger?: { info(value: unknown): void };
  createId?: () => string;
  now?: () => Date;
}

export class DemoQuoteDelivery implements QuoteDelivery {
  private readonly logger: { info(value: unknown): void };
  private readonly createId: () => string;
  private readonly now: () => Date;

  constructor(options: DemoDeliveryOptions = {}) {
    this.logger = options.logger ?? console;
    this.createId = options.createId ?? (() => crypto.randomUUID());
    this.now = options.now ?? (() => new Date());
  }

  async deliver(request: Parameters<QuoteDelivery["deliver"]>[0]) {
    const submissionId = this.createId();
    this.logger.info({
      event: "demo_quote",
      submissionId,
      locale: request.locale,
      service: request.service,
      timestamp: this.now().toISOString(),
    });

    return { ok: true as const, submissionId };
  }
}
