import { number } from "fp-ts";

export interface Article {
  nom: string;
  quantite: number;
  prix: number;
  conditionnement: "kilo" | "pièce";
}

export type Stock = Article[];

export type IntentionAchat = (stock: Stock) => {
  stock: Stock;
  message?: string;
  prixTotal: number;
};

// (article, quantite) => Stock => {Stock, message, quantite}
export const intentionAchat: (nom: string, quantite: number) => IntentionAchat =
  (nom: string, quantite: number) => (stock: Stock) => {
    const stockModifie = [...stock];
    const articleEnStock = stockModifie.find((article) => article.nom === nom);

    // Epuisement complet
    if (!articleEnStock || articleEnStock.quantite === 0)
      return {
        stock: stockModifie,
        message: `Mince, nous n'avons plus de ${nom}.`,
        prixTotal: 0,
      };

    // Epuisement partiel
    if (articleEnStock.quantite <= quantite) {
      const quantiteDisponible = articleEnStock.quantite;
      articleEnStock.quantite = 0;
      return {
        stock: stockModifie,
        message: `Nous n'avons plus que ${quantiteDisponible} ${articleEnStock.conditionnement} de ${nom}.`,
        prixTotal: quantiteDisponible * articleEnStock.prix,
      };
    }

    // Dispo complète
    articleEnStock.quantite -= quantite;
    return {
      stock: stockModifie,
      prixTotal: quantite * articleEnStock.prix,
    };
  };

export const checkout = (panier: IntentionAchat[], stock: Stock) => {
  return panier.reduce(
    (panier, intention: IntentionAchat) => {
      const {
        stock: stockModifie,
        message,
        prixTotal,
      } = intention(panier.stock);
      return {
        prixTotal: panier.prixTotal + prixTotal,
        messages: message ? [...panier.messages, message] : panier.messages,
        stock: stockModifie,
      };
    },
    { prixTotal: 0, messages: [] as string[], stock: stock }
  );
};
