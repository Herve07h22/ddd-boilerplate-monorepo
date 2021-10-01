import { checkout, intentionAchat, Stock } from "./ecommerce";

it("On peut ajouter 2kg de tomates et 1 kiwi", () => {
  const stock: Stock = [
    { nom: "Tomate", quantite: 1, prix: 3, conditionnement: "kilo" },
    { nom: "Kiwi", quantite: 2, prix: 2, conditionnement: "pièce" },
  ];

  const intentionAchat2kgTomates = intentionAchat("Tomate", 2);
  const intentionAchat1kiwi = intentionAchat("Kiwi", 1);

  const panierClient1 = [intentionAchat2kgTomates, intentionAchat1kiwi];
  const panierClient2 = [intentionAchat2kgTomates, intentionAchat1kiwi];

  // Puis le client 1 se décide à payer
  const {
    prixTotal: prixClient1,
    messages: messageClient1,
    stock: stockApresClient1,
  } = checkout(panierClient1, stock);

  expect(prixClient1).toEqual(5); // 1kg de tomate et 1 Kiwi
  expect(messageClient1).toEqual(["Nous n'avons plus que 1 kilo de Tomate."]);

  // Et le client 2 juste après
  const {
    prixTotal: prixClient2,
    messages: messageClient2,
    stock: stockApresClient2,
  } = checkout(panierClient2, stockApresClient1);
  expect(prixClient2).toEqual(2); // 1 Kiwi
  expect(messageClient2).toEqual([
    "Mince, nous n'avons plus de Tomate.",
    "Nous n'avons plus que 1 pièce de Kiwi.",
  ]);
});
