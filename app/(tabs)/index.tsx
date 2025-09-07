import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Search, MapPin, Bell, ShoppingCart, Briefcase, Chrome as Home, GraduationCap, Heart, Clock, Star, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickServices = [
    { id: 1, name: 'Shopping', icon: ShoppingCart, color: '#10b981' },
    { id: 2, name: 'Business', icon: Briefcase, color: '#3b82f6' },
    { id: 3, name: 'Household', icon: Home, color: '#f59e0b' },
    { id: 4, name: 'Student', icon: GraduationCap, color: '#8b5cf6' },
    { id: 5, name: 'Personal', icon: Heart, color: '#ef4444' },
  ];

  const recentOrders = [
    {
      id: 1,
      service: 'Grocery Shopping',
      status: 'Delivered',
      time: '2 hours ago',
      amount: 'KSh 850',
    },
    {
      id: 2,
      service: 'Document Printing',
      status: 'In Progress',
      time: '30 mins ago',
      amount: 'KSh 200',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#64748b" />
              <Text style={styles.location}>Kerugoya, Kirinyaga</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Brand Section */}
        <View style={styles.brandContainer}>
          <View style={styles.brandHeader}>
            <Zap size={32} color="#2563eb" />
            <Text style={styles.brandTitle}>Swift Assist</Text>
          </View>
          <Text style={styles.tagline}>Your errands, done fast.</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="What can we help you with today?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.servicesGrid}>
            {quickServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.8}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                  <service.icon size={24} color={service.color} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Banner */}
        <TouchableOpacity style={styles.featuredBanner} activeOpacity={0.8}>
          <View style={styles.bannerContent}>
            <View>
              <Text style={styles.bannerTitle}>New Customer?</Text>
              <Text style={styles.bannerSubtitle}>Get 20% off your first errand</Text>
            </View>
            <View style={styles.bannerIcon}>
              <Star size={24} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            {recentOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.8}
              >
                <View style={styles.orderInfo}>
                  <Text style={styles.orderService}>{order.service}</Text>
                  <View style={styles.orderMeta}>
                    <Clock size={14} color="#64748b" />
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderAmount}>{order.amount}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      order.status === 'Delivered' ? styles.deliveredBadge : styles.inProgressBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        order.status === 'Delivered' ? styles.deliveredText : styles.inProgressText,
                      ]}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: '#64748b',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  brandContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2563eb',
  },
  tagline: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#fff',
    width: (width - 64) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  featuredBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#dbeafe',
  },
  bannerIcon: {
    backgroundColor: '#1d4ed8',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
  },
  orderService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderTime: {
    fontSize: 14,
    color: '#64748b',
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveredBadge: {
    backgroundColor: '#dcfce7',
  },
  inProgressBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deliveredText: {
    color: '#16a34a',
  },
  inProgressText: {
    color: '#d97706',
  },
});