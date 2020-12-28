#execute apt-get update
exec { 'apt-get':
	command => '/usr/bin/apt-get update'
}

#install mongodb package
package { 'mongodb':
	require => Exce['apt-update'],
	ensure => installed,
}

#run the service
service { 'mongodb':
	ensure => running,
	require => Package['mongodb'],
}

#install redis-server package
package { 'redis-server':
	require => Exce['apt-update'],
	ensure => latest,
}

#run the service
service { 'redis-server':
	ensure => running,
	require => Package['redis-server'],
}

#create directory
file { "/home/vagrant/my-projects"
	ensure => "directory",
	owner => "vagrant",
	group => "vagrant",
	mode => 750,
}