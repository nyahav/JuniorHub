import Link from 'next/link';


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ברוכים הבאים לJuniorHub 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            הפלטפורמה המושלמת למפתחים ג׳וניורים המחפשים את המשרה הראשונה שלהם בעולם הפיתוח
          </p>
        </section>

        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            איך אנחנו עוזרים לך?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-medium text-blue-700 mb-3">
                מעקב אחר תהליכי גיוס
              </h3>
              <p className="text-gray-700 mb-4">
                לוח קנבן מתקדם לעקוב אחר כל שלבי הגיוס, מהריאיון הראשון ועד לקבלת הצעה.
              </p>
              <Link
                href="/kanban"
                className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
              >
                נסה את לוח הקנבן
              </Link>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-xl font-medium text-purple-700 mb-3">
                קהילת מפתחים תומכת
              </h3>
              <p className="text-gray-700 mb-4">
                התחבר עם מפתחים אחרים, שתף חוויות וחפש משרות מומלצות.
                <span className="text-purple-600 italic block mt-2">(בקרוב)</span>
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-medium text-green-700 mb-3">
                משאבים למפתחים ג׳וניורים
              </h3>
              <p className="text-gray-700 mb-4">
                מדריכים, טיפים לראיונות, והכוונה לקריירה בתחום.
                <span className="text-green-600 italic block mt-2">(בקרוב)</span>
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
              <h3 className="text-xl font-medium text-amber-700 mb-3">
                הצעות משרות מותאמות אישית
              </h3>
              <p className="text-gray-700 mb-4">
                גלה הזדמנויות תעסוקה שמתאימות לרמתך וניסיונך.
                <span className="text-amber-600 italic block mt-2">(בקרוב)</span>
              </p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/kanban"
            className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-md text-lg hover:bg-indigo-700 transition shadow-md"
          >
            התחל לנהל את חיפוש העבודה שלך
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; JuniorHub-all right reserved 2025</p>
        </div>
      </footer>
    </div>
  );
}
