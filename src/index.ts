/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// 許可するオリジンのリスト
		const allowedOrigins = [
			'http://localhost:3000', // ローカル開発用
			'https://cloudflare-pages-lesson.pages.dev' // 本番用
		];

		// リクエストのオリジンを取得
		const requestOrigin = request.headers.get('Origin');

		// 許可されたオリジンかどうかをチェック
		const allowOrigin = allowedOrigins.includes(requestOrigin) ? requestOrigin : 'null';

		// JSON形式のレスポンスデータを作成
		const jsonResponse = JSON.stringify({ message: `Hello World ${env.MY_VARIABLE}` });

		// Responseオブジェクトを作成し、Content-Typeヘッダーにapplication/jsonを設定
		// Responseオブジェクトを作成し、Content-Typeヘッダーにapplication/jsonを設定
		let response = new Response(jsonResponse, {
			headers: {
					"Content-Type": "application/json",
					// CORS関連のヘッダーを設定
					"Access-Control-Allow-Origin": allowOrigin, // すべてのオリジンからのアクセスを許可
					"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS", // 許可するHTTPメソッド
					"Access-Control-Allow-Headers": "Content-Type" // 許可するHTTPヘッダー
			}
		});
		// オプションリクエスト（プリフライトリクエスト）への対応
		if (request.method === "OPTIONS") {
			response = new Response(null, {
					headers: {
							"Access-Control-Allow-Origin": allowOrigin,
							"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
							"Access-Control-Allow-Headers": "Content-Type"
					}
			});
		}
		return response;
	},
};
