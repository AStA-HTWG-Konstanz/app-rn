export const endpoint = 'https://app.asta.htwg-konstanz.de/api/';

export var api = {
    authorize   : endpoint + 'user/auth',
    balance     : endpoint + 'user/balance',
    bib         : endpoint + 'bib',
    endlicht    : endpoint + 'endlicht',
    events      : endpoint + 'events',
    grades      : endpoint + 'user/grades',
    gradesRefresh: endpoint + 'user/grades/refresh',
    lectures    : endpoint + 'user/lectures',
    news        : endpoint + 'news/',
    news_ctgry  : endpoint + 'news/categories',
    number_news : endpoint + 'number_news'
};
