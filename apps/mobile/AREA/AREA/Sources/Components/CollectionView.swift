//
//  ExpandingCardListView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/12/2025.
//

import SwiftUI

struct CollectionView: View {
	@State private var selectedCardIndex: Int? = nil
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
					ForEach(filteredCards.indices, id: \.self) { index in
						TableView(
							item: filteredCards[index]
						)
					}
				}
				.padding()
				.navigationTitle(LocalizedStringResource.servicesTitle)
			}
		}
	}
}
