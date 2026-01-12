//
//  ExpandingCardListView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import SwiftUI

struct CollectionView: View {
	@EnvironmentObject var serviceStore: ServiceStore
	var searchText: String
	var body: some View {
		let allCards = serviceStore.fromServiceToCardItem()

		let filteredCards =
			searchText.isEmpty
			? allCards
			: allCards.filter { card in
				card.title.localizedCaseInsensitiveContains(searchText)
			}

		NavigationStack {
			ScrollView {
				VStack(spacing: 20) {
					ForEach(filteredCards) { card in
						TableView(item: card)
					}
				}
				.padding()
				.navigationTitle(LocalizedStringResource.servicesTitle)
			}
			.background(Color(UIColor.systemGroupedBackground))
		}
	}
}
