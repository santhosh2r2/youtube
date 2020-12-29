#execute apt-get update
exec { 'apt-get update':
  command => '/usr/bin/apt-get update'
}

#install mongodb package
package { 'mongodb':
  ensure  => installed,
  require => Exec['apt-get update']
}

#run the service
service { 'mongodb':
  ensure  => running,
  require => Package['mongodb']
}

#install redis-server package
package { 'redis-server':
  ensure  => latest,
  require => Exec['apt-get update']
}

#run the service
service { 'redis-server':
  ensure  => running,
  require => Package['redis-server']
}

#create directory
file { '/home/vagrant/my-projects':
  ensure => 'directory',
  owner  => 'vagrant',
  group  => 'vagrant',
  mode   => '0750'
}
